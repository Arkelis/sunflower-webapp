async function getSchedule(name) {
    const resp = await fetch(process.env.REACT_APP_API_ENTRYPOINT + `/channels/${name}/schedule/`)
    return  resp.json()
}

const getChannelSteps = async (endpoint) => {
    const resp = await fetch(process.env.REACT_APP_API_ENTRYPOINT + `/channels/${endpoint}`)
    return  resp.json()
}

const getChannelInfo = async (endpoint) => {
    const resp = await fetch(process.env.REACT_APP_API_ENTRYPOINT + `/channels/${endpoint}/`)
    const json = await resp.json()
    return {endpoint: endpoint, name: json.name, schedule: json.schedule, audio_stream: json.audio_stream}
}

const exportedObject = {
    getSchedule,
    getChannelSteps,
    getChannelInfo
};

export default exportedObject;
