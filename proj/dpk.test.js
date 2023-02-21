const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });
});

describe("deterministicPartitionKey", () => {
    it("returns partitionKey when given", () => {
        const event = {
            partitionKey: "sampleKey"
        };
        expect(deterministicPartitionKey(event))
            .toBe("sampleKey");
    });
});

describe("deterministicPartitionKey", () => {
    it("returns hash of event when partitionKey not given", () => {
        const event = {
            payload: "payload"
        };
        expect(deterministicPartitionKey(event))
            .toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
    });
});


describe("deterministicPartitionKey", () => {
    it("returns hash of event when partitionKey not given", () => {
        const event = {
            payload: "payload"
        };
        expect(deterministicPartitionKey(event))
            .toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
    });
});


describe("deterministicPartitionKey", () => {
    it("returns candidate hash when partitionKey exceeds 256 bytes", () => {
        let largePartitionKey = "";
        for (let i = 0; i < 257; i++) {
            largePartitionKey += "a";
        }
        const event = {
            partitionKey: largePartitionKey
        };
        expect(deterministicPartitionKey(event))
            .toBe(crypto.createHash("sha3-512").update(largePartitionKey).digest("hex"));
    });
});

