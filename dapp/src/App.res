@bs.module external tokenAddress: string = "@fa1.2-workshop/contracts/deployments/token"

@react.component
let make = () => {
  <main>
    {React.string("FA1.2 workshop")}
    <div>
      <span>{tokenAddress |> React.string}</span>
    </div>
  </main>
}
