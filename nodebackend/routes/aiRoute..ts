import express from 'express'
const router = express.router();

router.post('/generate', async (req, res)=>{
    const { prompt } = req.body;
    try {
        const imagePath = await generateArt(prompt);
        res.send({success : true, imagePath});
    } catch (error) {
        console.log(error); 
    }
})