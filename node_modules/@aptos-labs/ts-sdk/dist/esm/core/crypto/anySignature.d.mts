import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { Signature } from './asymmetricCrypto.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

declare class AnySignature extends Signature {
    readonly signature: Signature;
    constructor(signature: Signature);
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
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): AnySignature;
}

export { AnySignature };
