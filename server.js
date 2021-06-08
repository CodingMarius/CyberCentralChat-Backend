const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

const headers = {
    headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'tbqubu27vqr1w3kusjbhzklvzfwnr6'
    }
}

app.get("/chatters/:id", async(req, res) => {
    try {
        const uri = `https://tmi.twitch.tv/group/user/${req.params.id}/chatters`
        const response = await axios.get(uri);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json(error.data);
    }
});

app.get("/betterttv/:id", async(req, res) => {
    try {
        const uri = `https://api.betterttv.net/3/cached/users/twitch/${req.params.id}`
        const response = await axios.get(uri);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json(error.data);
    }
});


app.get("/betterttvglobal", async(req, res) => {
    try {
        const uri = `https://api.betterttv.net/3/cached/emotes/global`
        const response = await axios.get(uri);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json(error.data);
    }
});

app.get("/twitchuser/:id", async(req, res) => {
    try {
        const uri = `https://api.twitch.tv/kraken/users?login=${req.params.id}`
        const response = await axios.get(uri, headers);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json(error.data);
    }
});

app.get("/twitchemotes", async(req, res) => {
    try {
        const uri = `https://api.twitch.tv/kraken/chat/emoticons`
        const response = await axios.get(uri, headers);
        const jsonStream = fs.createReadStream(response);
        res.status(200).json(jsonStream.pipe(res));
    } catch (error) {
        res.status(400).json(error.data);
    }
});


const listener = app.listen(5000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});