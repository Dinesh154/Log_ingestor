const Log = require("../models/log");
const add_log = async (req, res) => {
    try {
        const logdata = req.body;
        const log = await Log.create(logdata);
        return res.status(200).send("Log added successfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error adding log");   
    }
} 

const fetLogsForFullTextSearch = async (req, res) => {
    try {
        const searchText = req.params.text;
        const filters = req.body.filters;
        const startTime = req.body.start;
        const endTime = req.body.end;
        let logs = [];
        if (filters.length > 0) {
            let query = [];
            filters.forEach(filter => {
                query.push({ [filter]: { $regex: searchText, $options: 'i' } });
            });
            query = { $or: query };
            // to find logs in between date ranges only if start and end time are provided
             if (startTime.length!=0 && endTime.length!=0) {
                query["timestamp"] = {
                    $gte: new Date(startTime),
                    $lte: new Date(endTime)
                }
            }
            console.log(query);
            logs = await Log.find(query).lean();
        }
        else {
            let query = {
                $or: [
                  { level: { $regex: searchText, $options: 'i' } },
                  { message: { $regex: searchText, $options: 'i' } },
                  { resourceId: { $regex: searchText, $options: 'i' } },
                  { traceId: { $regex: searchText, $options: 'i' } },
                  { spanId: { $regex: searchText, $options: 'i' } },
                  { commit: { $regex: searchText, $options: 'i' } },
                  { "metadata.parentResourceId": { $regex: searchText, $options: 'i' } },
                ],
            };
            if (startTime.length!=0 && endTime.length!=0) {
                query["timestamp"] = {
                    $gte: new Date(startTime),
                    $lte: new Date(endTime)
                }
            }
            else {
                //by default it will fetch logs of last 24 hours
                query["timestamp"] = {
                    $gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
                    $lte: new Date()
                }
            }
            logs = await Log.find(query).lean();
        }
        console.log(logs);
        if(logs.length == 0)
            return res.status(404).send("No logs found");
        return res.status(200).send(logs);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error fetching logs");
    }
}

const fetLogsForNullSearch = async (req, res) => {
    try {
        const startTime = req.body.start;
        const endTime = req.body.end;
        let query = {};
        if (startTime.length!=0 && endTime.length!=0) {
            query["timestamp"] = {
                $gte: new Date(startTime),
                $lte: new Date(endTime)
            }
        }
        else {
            //by default it will fetch logs of last 24 hours
            query["timestamp"] = {
                $gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
                $lte: new Date()
            }
        }
        const logs = await Log.find(query).lean();
        console.log(logs);
        if (logs.length == 0)
            return res.status(404).send("No logs found");
        return res.status(200).send(logs);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error fetching logs");
    }
}

module.exports = {add_log,fetLogsForFullTextSearch,fetLogsForNullSearch};