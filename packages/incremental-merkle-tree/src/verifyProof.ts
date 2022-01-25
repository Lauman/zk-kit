import { MerkleProof } from "@zk-kit/types"
import checkParameter from "./checkParameter"
import { HashFunction } from "./types"

export default function verifyProof(proof: MerkleProof, hash: HashFunction): boolean {
  checkParameter(proof, "proof", "object")
  checkParameter(proof.root, "proof.root", "number", "string", "bigint")
  checkParameter(proof.leaf, "proof.leaf", "number", "string", "bigint")
  checkParameter(proof.siblings, "proof.siblings", "object")
  checkParameter(proof.pathIndices, "proof.pathElements", "object")

  let node = proof.leaf

  for (let i = 0; i < proof.siblings.length; i += 1) {
    proof.siblings[i].splice(proof.pathIndices[i], 0, node)

    node = hash(proof.siblings[i])
  }

  return proof.root === node
}