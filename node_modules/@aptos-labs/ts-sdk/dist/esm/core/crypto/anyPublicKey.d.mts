import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { HexInput } from '../../types/index.mjs';
import { AnySignature } from './anySignature.mjs';
import { PublicKey } from './asymmetricCrypto.mjs';
import { Ed25519PublicKey } from './ed25519.mjs';
import { Secp256k1PublicKey } from './secp256k1.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

/**
 * Represents any public key supported by Aptos.
 *
 * Since [AIP-55](https://github.com/aptos-foundation/AIPs/pull/263) Aptos supports
 * `Legacy` and `Unified` authentication keys.
 *
 * Any unified authentication key is represented in the SDK as `AnyPublicKey`.
 */
declare class AnyPublicKey extends PublicKey {
    /**
     * Reference to the inner public key
     */
    readonly publicKey: PublicKey;
    constructor(publicKey: PublicKey);
    /**
     * Get the public key in bytes (Uint8Array).
     *
     * @returns Uint8Array representation of the public key
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the public key as a hex string with the 0x prefix.
     *
     * @returns string representation of the public key
     */
    toString(): string;
    /**
     * Verifies a signed data with a public key
     *
     * @param args.message message
     * @param args.signature The signature
     * @returns true if the signature is valid
     */
    verifySignature(args: {
        message: HexInput;
        signature: AnySignature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): AnyPublicKey;
    static isPublicKey(publicKey: PublicKey): publicKey is AnyPublicKey;
    isEd25519(): this is Ed25519PublicKey;
    isSecp256k1PublicKey(): this is Secp256k1PublicKey;
}

export { AnyPublicKey };
