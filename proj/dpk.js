const crypto = require("crypto");
const config = require("./config").deterministicPartition;

exports.deterministicPartitionKey = (event) => {
    let candidate;

    if (!event) {
        return config.TRIVIAL_PARTITION_KEY;
    }

    if (event.partitionKey) {
        candidate = event.partitionKey;
    } else {
        candidate = getHashFromEvent(event);
    }

    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > config.MAX_PARTITION_KEY_LENGTH) {
        candidate = getHash(candidate);
    }
    return candidate;
};

function getHashFromEvent(event) {
    const data = JSON.stringify(event);
    hash = getHash(data);
    return hash;
}

function getHash(data, digest="hex") {
    return crypto.createHash(config.HASH).update(data).digest(digest);
}


