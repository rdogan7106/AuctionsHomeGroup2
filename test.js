import React, { createContext, useContext } from 'react';






// Anynmouse- self executing- recursive - arrow




let me = h => l => w => {console.log(h*l*w)};
me(10)(10)(10);


(function(){console.log("Okey")})();


let x = function(xx){
    if(xx>0)
    {console.log('Hello');
    x(xx-1);
}
}

x(3);


let count = function(para){if(para>100){console.log(para); count(para/2);}};
count(500);


console.log(x.toString())


console.log("Masoud".slice(1));


function skriv(x ="Masoud"){
   if(x.length>0){ console.log(x)
    skriv(x.slice(0,-1))
}
}

skriv();




// man måste fånga och slänga runt den.
fetch('http://localhost:3000/users')
.then(reponse => {return(reponse.json())});




















