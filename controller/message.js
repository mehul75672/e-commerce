
var Messages = require("../model/message");

var now = new Date();
var times = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
});


const message = async (req, res) => {
    try {
        var user = req.send
        var sender = user.id
        var receiver = req.params.id
        var text = req.body
        var a = []
        var message = await Messages.findOne({ $and: [{ users_id: sender }, { users_id: receiver }] })
        if (!message) {
            await a.push(sender, receiver)
            var add = await Messages.create({
                users_id: a,
                messages: {
                    name: user.name,
                    text: text.text,
                    time: times
                }
            })
            return res.status(201).json(add);
        }
        var b = await Messages.findByIdAndUpdate(message.id, {
            $push: {
                messages: {
                    name: user.name,
                    text: text.text,
                    time: times
                }
            }
        }, { new: true })
        return res.status(200).json(b);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}

const twousermessagget = async (req, res) => {
    try {
        var user = req.send
        var sender = user.id
        var a = []
        var receiver = req.params.id
        await Messages.findOne({ $and: [{ users_id: sender }, { users_id: receiver }] }).then((r) => {
            r.messages.map(async (f) => {
                await a.push(`${f.name}  ${f.time} :  ${f.text}`)
            })
        })
        res.status(200).json(a)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}

const groupcreate = async (req, res) => {
    try {
        var admin = req.send.id
        var careate = await Messages.create({
            groupname: req.body.groupname,
            users_id: req.body.users,
            admin: admin,
        });
        return res.status(201).json(careate);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const groupmessage = async (req, res) => {
    try {
        var user = req.send
        var id = req.params.id
        var userid = user.id
        var text = req.body
        var message = await Messages.findOne({ $and: [{ id: id }, { users_id: userid }] })
        var b = await Messages.findByIdAndUpdate(message.id, {
            $push: {
                messages: {
                    name: user.name,
                    text: text.text,
                    time: times
                }
            }
        }, { new: true })
        return res.status(200).json(b);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const groupallmessagget = async (req, res) => {
    try {
        const a = await Messages.findById(req.params.id).populate("users_id").populate("admin")
        return res.status(200).json(a)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}


const oneuseradd = async (req, res) => {
    try {
        var user = req.send
        let userid = user.id
        var b = await Messages.findOneAndUpdate({ $and: [{ id: req.params.id }, { admin: userid }] }, {
            $push: {
                users_id: req.body.user
            }
        }, { new: true })
        res.status(200).json(b);
        return res.status(200).json({ status: true, message: "user add succass fully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message });
    }
}
    
module.exports = { message, twousermessagget, groupcreate, groupmessage, groupallmessagget, oneuseradd }