import { AccountAddress } from './accountAddress.mjs';
import { PublicKey } from './crypto/asymmetricCrypto.mjs';
import { Hex } from './hex.mjs';
import { HexInput, AuthenticationKeyScheme } from '../types/index.mjs';
import { Serializable, Serializer } from '../bcs/serializer.mjs';
import { Deserializer } from '../bcs/deserializer.mjs';
import './common.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * Each account stores an authentication key. Authentication key enables account owners to rotate
 * their private key(s) associated with the account without changing the address that hosts their account.
 * @see {@link https://aptos.dev/concepts/accounts | Account Basics}
 *
 * Account addresses can be derived from AuthenticationKey
 */
declare class AuthenticationKey extends Serializable {
    /**
     * An authentication key is always a SHA3-256 hash of data, and is always 32 bytes.
     *
     * The data to hash depends on the underlying public key type and the derivation scheme.
     */
    static readonly LENGTH: number;
    /**
     * The raw bytes of the authentication key.
     */
    readonly data: Hex;
    constructor(args: {
        data: HexInput;
    });
    serialize(serializer: Serializer): void;
    /**
     * Deserialize an AuthenticationKey from the byte buffer in a Deserializer instance.
     * @param deserializer The deserializer to deserialize the AuthenticationKey from.
     * @returns An instance of AuthenticationKey.
     */
    static deserialize(deserializer: Deserializer): AuthenticationKey;
    toString(): string;
    toUint8Array(): Uint8Array;
    /**
     * Derives an AuthenticationKey from the public key seed bytes and an explicit derivation scheme.
     *
     * This facilitates targeting a specific scheme for deriving an authentication key from a public key.
     *
     * @param args - the public key and scheme to use for the derivation
     */
    static fromPublicKeyAndScheme(args: {
        publicKey: PublicKey;
        scheme: AuthenticationKeyScheme;
    }): AuthenticationKey;
    /**
     * Converts a PublicKey(s) to an AuthenticationKey, using the derivation scheme inferred from the
     * instance of the PublicKey type passed in.
     *
     * @param args.publicKey
     * @returns AuthenticationKey
     */
    static fromPublicKey(args: {
        publicKey: PublicKey;
    }): AuthenticationKey;
    /**
     * Derives an account address from an AuthenticationKey. Since an AccountAddress is also 32 bytes,
     * the AuthenticationKey bytes are directly translated to an AccountAddress.
     *
     * @returns AccountAddress
     */
    derivedAddress(): AccountAddress;
}

export { AuthenticationKey };
