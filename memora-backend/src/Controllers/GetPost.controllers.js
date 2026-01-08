import DiaryEntry from "../Models/DiaryEntry.js";

export const getPost = async (req, res) => {
    const { id } = req.id;

    if(!id || !id.trim()){
        return res.status(400).json({
            success: false,
            message: "ID Required",
        });
    }

    try{
        const result = await DiaryEntry.findOne({
            _id: id,
            user: req.session.userID,
            isDeleted: false,
        })

        return res.status(200).json({
            success: true,
            result,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}