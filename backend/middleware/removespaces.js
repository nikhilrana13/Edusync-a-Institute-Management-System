

export const removespaces=(req,res,next)=>{
    console.log("Before Trim:", JSON.stringify(req.url));
    // req.url = req.url.trim();
    req.url = decodeURIComponent(req.url).replace(/\n|\r/g, "").trim();
    // console.log("url",req.url);
    // console.log("After Trim:", JSON.stringify(req.url));
    next();
}

