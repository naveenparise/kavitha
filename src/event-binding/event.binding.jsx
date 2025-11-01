export function EventBinding(){
   
   
    function handleInsertClick(e){
        setMsg('Insert Successfully');
        console.log()
    }
    return(
        <div className="container-fluid">
            <button value="insert" id="btnInsert " onClick={handleInsertClick}>Insert</button>
            <p>{msg}</p>
        </div>
    )
}