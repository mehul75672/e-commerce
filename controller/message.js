
var Messages = require("../model/message");



const message = async (req, res) => {
    try {
        var user = req.send
        var sender = user.id
        var receiver = req.params.id
        var text = req.body
        var a = []
        const now = new Date();
        const withPmAm = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        var message = await Messages.findOne({ $and: [{ users_id: sender }, { users_id: receiver }] })
        if (!message) {
            await a.push(sender, receiver)
            var add = await Messages.create({
                users_id: a,
                messages: {
                    name: user.firstname,
                    text: text.text,
                    time:withPmAm
                }
            })
            return res.status(201).json(add);
        }
        var b = await Messages.findByIdAndUpdate(message.id, {
            $push: {
                messages: {
                    name: user.firstname,
                    text: text.text,
                    time:withPmAm
                }
            }
        }, { new: true })
        return res.status(200).json(b);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}

const allmessag = async (req, res) => {
    try {
        var user = req.send
        var sender = user.id
        var a = []
        var receiver = req.params.id
        await Messages.findOne({ $and: [{ users_id: sender }, { users_id: receiver }] }).then((r) => {
            r.messages.map(async (f) => {
                await a.push(`${f.name} : ${f.text}`)
            })
        })
        res.status(200).json(a)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}
module.exports = { message, allmessag }