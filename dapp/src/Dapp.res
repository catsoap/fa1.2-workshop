module D = Webapi.Dom
module Doc = Webapi.Dom.Document
module Elem = Webapi.Dom.Element

@bs.module external tokenAddress: string = "@fa1.2-workshop/contracts/deployments/token"

let _ = Doc.getElementById("address", D.document)->Belt.Option.map(_, Elem.setInnerText(_, tokenAddress))
