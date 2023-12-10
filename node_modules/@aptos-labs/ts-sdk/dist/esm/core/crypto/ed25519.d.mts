import { PublicKey, PrivateKey, Signature } from './asymmetricCrypto.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { HexInput } from '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

/**
 * Represents the public key of an Ed25519 key pair.
 *
 * Since [AIP-55](https://github.com/aptos-foundation/AIPs/pull/263) Aptos supports
 * `Legacy` and `Unified` authentication keys.
 *
 * Ed25519 scheme is represented in the SDK as `Legacy authentication key` and also
 * as `AnyPublicKey` that represents any `Unified authentication key`
 */
declare class Ed25519PublicKey extends PublicKey {
    /**
     * Length of an Ed25519 public key
     */
    static readonly LENGTH: number;
    /**
     * Bytes of the public key
     * @private
     */
    private readonly key;
    /**
     * Create a new PublicKey instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
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
     * @param args.message a signed message
     * @param args.signature the signature of the message
     */
    verifySignature(args: {
        message: HexInput;
        signature: Ed25519Signature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Ed25519PublicKey;
    static load(deserializer: Deserializer): Ed25519PublicKey;
    static isPublicKey(publicKey: PublicKey): publicKey is Ed25519PublicKey;
}
/**
 * Represents the private key of an Ed25519 key pair.
 */
declare class Ed25519PrivateKey extends PrivateKey {
    /**
     * Length of an Ed25519 private key
     */
    static readonly LENGTH: number;
    /**
     * The Ed25519 key seed to use for BIP-32 compatibility
     * See more {@link https://github.com/satoshilabs/slips/blob/master/slip-0010.md}
     */
    static readonly SLIP_0010_SEED = "ed25519 seed";
    /**
     * The Ed25519 signing key
     * @private
     */
    private readonly signingKeyPair;
    /**
     * Create a new PrivateKey instance from a Uint8Array or String.
     *
     * @param hexInput HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
    /**
     * Get the private key in bytes (Uint8Array).
     *
     * @returns Uint8Array representation of the private key
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the private key as a hex string with the 0x prefix.
     *
     * @returns string representation of the private key
     */
    toString(): string;
    /**
     * Sign the given message with the private key.
     *
     * @param message in HexInput format
     * @returns Signature
     */
    sign(message: HexInput): Ed25519Signature;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Ed25519PrivateKey;
    /**
     * Generate a new random private key.
     *
     * @returns Ed25519PrivateKey
     */
    static generate(): Ed25519PrivateKey;
    /**
     * Derive the Ed25519PublicKey for this private key.
     *
     * @returns Ed25519PublicKey
     */
    publicKey(): Ed25519PublicKey;
    /**
     * Derives a private key from a mnemonic seed phrase.
     *
     * To derive multiple keys from the same phrase, change the path
     *
     * IMPORTANT: Ed25519 supports hardened derivation only (since it lacks a key homomorphism,
     * so non-hardened derivation cannot work)
     *
     * @param path the BIP44 path
     * @param mnemonics the mnemonic seed phrase
     */
    static fromDerivationPath(path: string, mnemonics: string): Ed25519PrivateKey;
    /**
     * A private inner function so we can separate from the main fromDerivationPath() method
     * to add tests to verify we create the keys correctly.
     *
     * @param path the BIP44 path
     * @param seed the seed phrase created by the mnemonics
     * @param offset the offset used for key derivation, defaults to 0x80000000
     * @returns
     */
    private static fromDerivationPathInner;
    static isPrivateKey(privateKey: PrivateKey): privateKey is Ed25519PrivateKey;
}
/**
 * A signature of a message signed using an Ed25519 private key
 */
declare class Ed25519Signature extends Signature {
    /**
     * Length of an Ed25519 signature
     */
    static readonly LENGTH = 64;
    /**
     * The signature bytes
     * @private
     */
    private readonly data;
    constructor(hexInput: HexInput);
    /**
     * Get the signature in bytes (Uint8Array).
     *
     * @returns Uint8Array representation of the signature
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the signature as a hex string with the 0x prefix.
     *
     * @returns string representation of the signature
     */
    toString(): string;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Ed25519Signature;
    static load(deserializer: Deserializer): Ed25519Signature;
    static isSignature(signature: Signature): signature is Ed25519Signature;
}

export { Ed25519PrivateKey, Ed25519PublicKey, Ed25519Signature };
