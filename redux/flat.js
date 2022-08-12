let input =  [4,5,[4,5,3],5,[[6,],7,[8,[8,0]]]]

// do i know the level of nesting involved

function flatten(arr){
    let out = []
     for(let i =0 ; i<arr.length; i++){
       if(typeof arr[i] === "number"){
        //if number, we push into output array
            out.push(arr[i])
       }
       else{
        // call flatten again
        out.push(  ...flatten(arr[i])  )
       }
     }
     return out
 }

 console.log(flatten(input))