function printReport(pages){
    console.log("<-----------Report has Started-------------->");
    let sortable=[];
    for(let urls in pages){
        sortable.push([urls,pages[urls]]);
    }
    sortable.sort((a,b)=>{
        return b[1]-a[1];
    })
    for(let i=0;i<sortable.length;i++){
        console.log(`Found ${sortable[i][1]} internal links to ${sortable[i][0]}\n`);
    }
    console.log("<-----------Report has Ended-------------->");
}
export {printReport};