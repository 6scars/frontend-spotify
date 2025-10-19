let controller;

function signIn(req, res, next) {
    return res.status(202).json({ message: "accomplished" })
}
function signUp(req,res,next){
    return res.status(202).json({ message: "accomplished" })
}

export default controller = {
    signIn,
    signUp
}