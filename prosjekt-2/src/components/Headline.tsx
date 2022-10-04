
function Headline() {


  return (
      <>
      {/* // Get saved data from sessionStorage */}
      <h3 id="headline" data-testid="headline">Nice to meet you! <br /> Please add a project id and an access token
        so I can show you some information. {sessionStorage.getItem("emoji")}</h3>
    </>
  );
}

export default Headline;
