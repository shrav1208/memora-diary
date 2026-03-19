import DiaryEntry from "../Models/DiaryEntry.js";

export const searchPosts = async(req, res) => {
    const { q } = req.query;

    if(!q || !q.trim()){
        return res.status(400).json({
            success: false,
            message: "Search Query Required",
        });
    }

    try{
        const queryTrim = q.trim();
        const escaped = queryTrim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex chars

        const results = await DiaryEntry.find({
            user: req.session.userID,
            isDeleted: false,
            $or: [
                { title: { $regex: escaped, $options: 'i'} },
                { content: { $regex: escaped, $options: 'i'} },
            ]
        }).limit(20).sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            results,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}