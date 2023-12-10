import { HexInput } from '../../types/index.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { AnyPublicKey } from './anyPublicKey.mjs';
import { AnySignature } from './anySignature.mjs';
import { PublicKey } from './asymmetricCrypto.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';
import './ed25519.mjs';
import './secp256k1.mjs';

declare class MultiKey extends PublicKey {
    /**
     * List of any public keys
     */
    readonly publicKeys: AnyPublicKey[];
    /**
     * The minimum number of valid signatures required, for the number of public keys specified
     */
    readonly signaturesRequired: number;
    constructor(args: {
        publicKeys: PublicKey[];
        signaturesRequired: number;
    });
    toUint8Array(): Uint8Array;
    /**
     * Create a bitmap that holds the mapping from the original public keys
     * to the signatures passed in
     *
     * @param args.bits array of the index mapping to the matching public keys
     * @returns Uint8array bit map
     */
    createBitmap(args: {
        bits: number[];
    }): Uint8Array;
    /**
     * Hex string representation the multi key bytes
     *
     * @returns string
     */
    toString(): string;
    verifySignature(args: {
        message: HexInput;
        signature: AnySignature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): MultiKey;
}

export { MultiKey };
