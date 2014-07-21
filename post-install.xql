xquery version "3.0";

declare namespace file="http://exist-db.org/xquery/file";

(: The following external variables are set by the repo:deploy function :)
(: file path pointing to the exist installation directory :)
declare variable $home external;
(: the target collection into which the app is deployed :)
declare variable $target external;


declare function local:escape-for-regex
  ( $arg as xs:string? )  as xs:string {

   replace($arg,
           '(\.|\[|\]|\\|\||\-|\^|\$|\?|\*|\+|\{|\}|\(|\))','\\$1')
 } ;

declare function local:substring-after-last
  ( $arg as xs:string? ,
    $delim as xs:string )  as xs:string {

   replace ($arg,concat('^.*',local:escape-for-regex($delim)),'')
};

declare function local:substring-before-last
  ( $arg as xs:string? ,
    $delim as xs:string )  as xs:string {

   if (matches($arg, local:escape-for-regex($delim)))
   then replace($arg,
            concat('^(.*)', local:escape-for-regex($delim),'.*'),
            '$1')
   else ''
 } ;

declare function local:mkcol-recursive($collection, $components) {
    if (exists($components)) then
        let $newColl := concat($collection, "/", $components[1])
        return (
            xmldb:create-collection($collection, $components[1]),
            local:mkcol-recursive($newColl, subsequence($components, 2))
        )
    else
        ()
};

declare function local:mkcol($collection, $path) {
    local:mkcol-recursive($collection, tokenize($path, "/"))
};

declare function local:store-polymer() {
    let $zip := util:binary-doc($target || '/components.zip') 
    let $store := compression:unzip($zip, function($path as xs:string, $data-type as xs:string, $param as item()*) as xs:boolean { true() }, (), function($path as xs:string, $data-type as xs:string, $data as item()?, $param as item()*) {
        if($data-type eq 'folder')
        then (
            local:mkcol($target, $path)
        ) else (
            local:mkcol($target, local:substring-before-last($path, "/")), xmldb:store( $target || "/" ||  local:substring-before-last($path, "/"), local:substring-after-last($path, "/"), $data, 'application/octet-stream')
        )
        }, ())
        return $store    
};

let $log := util:log("INFO","TARGET: " || $target)
return local:store-polymer()

