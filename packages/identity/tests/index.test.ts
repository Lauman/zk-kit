import { Strategy, ZkIdentity } from "../src"

describe("Semaphore identity", () => {
  describe("Create identity", () => {
    it("Should create a Semaphore identity", async () => {
      const identity: ZkIdentity = new ZkIdentity()

      expect(typeof identity).toBe("object")
    })

    it("Should create a Semaphore identity with a message strategy", async () => {
      const identity: ZkIdentity = new ZkIdentity(Strategy.MESSAGE, "message")

      expect(typeof identity).toBe("object")
    })

    it("Should generate secret from identity", async () => {
      const identity: ZkIdentity = new ZkIdentity()
      identity.genSecret()
      const identitySecret = identity.getSecret()

      expect(identitySecret).toHaveLength(2)
      expect(typeof identitySecret).toBe("object")
    })

    it("Should generate multipart secret", async () => {
      const secretParts = 5
      const identity: ZkIdentity = new ZkIdentity()
      identity.genMultipartSecret(secretParts)
      const identitySecret = identity.getMultipartSecret()

      expect(identitySecret).toHaveLength(5)
      expect(typeof identitySecret).toBe("object")
    })

    it("Should generate identity commitment from identity", async () => {
      const identity: ZkIdentity = new ZkIdentity()
      const identityCommitment: bigint = identity.genIdentityCommitment()

      expect(typeof identityCommitment).toBe("bigint")
    })

    it("Should serialize identity", async () => {
      const identity: ZkIdentity = new ZkIdentity()
      const serialized: string = identity.serializeIdentity()

      expect(typeof serialized).toBe("string")
    })

    it("Should unserialize identity", async () => {
      const identity: ZkIdentity = new ZkIdentity()
      const serialized: string = identity.serializeIdentity()
      const unserialized: ZkIdentity = ZkIdentity.genFromSerialized(serialized)

      expect(unserialized).toStrictEqual(identity)
    })
  })
})