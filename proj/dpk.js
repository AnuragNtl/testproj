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
        candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
};

function getHashFromEvent(event) {
    const data = JSON.stringify(event);
    hash = crypto.createHash("sha3-512").update(data).digest("hex");
    return hash;
}

