window.onload = () => {

    if(document.cookie){
        return;
    };

    const body = document.getElementsByTagName("body")[0];

    const bodyOverflow = body.style.overflow;
    const bodyFilters = [];
    
    for(var i = 0; i<body.children.length; i++){
        bodyFilters.push(body.children[i].style.filter);
        body.children[i].style.filter = "blur(2px)";
    };
    
    body.style.overflow = "hidden";
    
    const popup = document.createElement("div");
    body.appendChild(popup);
    
    const title = document.createElement("h1");
    title.innerHTML = "GDPR consent";
    popup.appendChild(title);
    
    const vendorList = document.createElement("div");
    vendorList.id = "vendorlist";
    popup.appendChild(vendorList);
    
    const buttons = document.createElement("div");
    popup.appendChild(buttons);
    
    const acceptButton = document.createElement("button");
    acceptButton.innerHTML = "Accept";
    acceptButton.onmouseover = () => {
        acceptButton.style.background = "springgreen";
        acceptButton.style.color = "whitesmoke";
    };
    acceptButton.onmouseout = () => {
        acceptButton.style.background = "whitesmoke";
        acceptButton.style.color = "springgreen";
    };
    acceptButton.onclick = () => {
        const vendors = document.getElementById("vendorlist").children;
        const rejected = [];
        for(var i = 0; i<vendors.length; i++){
            if(!vendors[i].children[1].checked){
                rejected.push(vendors[i].children[0].innerHTML)
            };
        };
        if(rejected.length){
            document.cookie = "decision = rejected " + rejected.toString() + "; max-age=86400; secure";
        }else{
            document.cookie = "decision = accepted all " + "; max-age=86400; secure";
        }
        for(var i = 0; i<body.children.length; i++){
            body.children[i].style.filter = bodyFilters[i];
        };
        body.style.overflow = bodyOverflow;
        body.removeChild(popup);
    };
    buttons.appendChild(acceptButton);
    
    const rejectButton = document.createElement("button");
    rejectButton.innerHTML = "Reject";
    rejectButton.onmouseover = () => {
        rejectButton.style.background = "crimson";
        rejectButton.style.color = "whitesmoke";
    };
    rejectButton.onmouseout = () => {
        rejectButton.style.background = "whitesmoke";
        rejectButton.style.color = "crimson";
    };
    rejectButton.onclick = () => {
        document.cookie = "decision = rejected all; max-age=86400; secure";
        
        for(var i = 0; i<body.children.length; i++){
            body.children[i].style.filter = bodyFilters[i];
        };
        
        body.style.overflow = bodyOverflow;
        body.removeChild(popup);
    };
    buttons.appendChild(rejectButton);    
    
    //style
    Object.assign(popup.style, {
        background: "white",
        height: "80%",
        width: "40%",
        position: "fixed",
        top: "10%",
        left: "30%",
        zIndex: "99999999999",
        boxShadow: "5px 20px 30px gray",
        background: "whitesmoke"
    });
    Object.assign(title.style, {
        width: "50%",
        margin: "5% auto",
        textAlign: "center"
    });
    Object.assign(vendorList.style, {
        width: "80%",
        height: "60%",
        margin: "5% auto",
        outline: "2px solid gray",
        boxShadow: "1px 4px 5px gray",
        overflow: "hidden",
        overflowY: "scroll",
        overflowX: "auto",
        background: "white",
        scrollbarColor: "white lightgray"
    });
    Object.assign(buttons.style, {
        width: "80%",
        height: "10%",
        margin: "7% auto",
        textAlign: "center"
    });
    Object.assign(acceptButton.style, {
        margin: "0 5%",
        width: "40%",
        height: "100%",
        background: "whitesmoke",
        color: "springgreen",
        border: "3px solid springgreen",
        borderRadius: "10px",
        fontSize: "20px",
        transition: "color background .5s"
    });
    Object.assign(rejectButton.style, {
        margin: "0 5%",
        width: "40%",
        height: "100%",
        background: "whitesmoke",
        color: "crimson",
        border: "3px solid crimson",
        borderRadius: "10px",
        fontSize: "130%",
        transition: "color background .5s"
    });
    fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')
    .then(response => response.json())
    .then(data => {
        const vendors = Object.values(data.vendors);

        for(var i =0; i<vendors.length; i++){
            const div = document.createElement("div");
            vendorList.appendChild(div);
            
            const a = document.createElement("a");
            a.href = vendors[i].policyUrl;
            a.innerHTML = vendors[i].name;
            a.target = "_blank";
            a.rel = "noopener noreferrer nofollow";            
            div.appendChild(a);
            
            const c = document.createElement("input");
            c.type = "checkbox";
            c.checked = true;
            div.appendChild(c);

            //style            
            Object.assign(div.style, {
                width: "450px",
                height: "auto",
                margin: "2% auto",
                borderBottom: "1px solid black",
                padding: "0 0 2% 0"
            });
            Object.assign(a.style, {
                width: "80%",
                margin: "0 2%",
                color: "dodgerblue",
                display: "inline"
            });
            Object.assign(c.style, {
                height: "25px",
                margin: "0 2%",
                float: "right"
            });
        };
    });

};