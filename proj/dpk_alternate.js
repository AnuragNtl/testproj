const crypto = require("crypto");
const config = require("./config").deterministicPartition;

const getCandidateFromEvent = (event) => {

    if (event.partitionKey) {
        candidate = event.partitionKey;
    } else {
        candidate = getHashFromEvent(event);
    }
    return candidate;
}

const candidateToString = (candidate) => {

    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }
    return candidate;
}

const candidateToHash = (candidate) => {
    if (candidate.length > config.MAX_PARTITION_KEY_LENGTH) {
        candidate = getHash(candidate);
    }
    return candidate;
}

const transformations = [
    candidateToString,
    candidateToHash
];

const transform = (candidate) => {
    for (let transformation of transformations) {
        candidate = transformation(candidate);
    }
    return candidate;
}

exports.deterministicPartitionKey = (event) => {

    if (!event) {
        return config.TRIVIAL_PARTITION_KEY;
    }

    return transform(getCandidateFromEvent(event));

};

function getHashFromEvent(event) {
    const data = JSON.stringify(event);
    hash = getHash(data);
    return hash;
}

function getHash(data, digest="hex") {
    return crypto.createHash(config.HASH).update(data).digest(digest);
}


