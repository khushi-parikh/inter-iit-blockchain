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
 * Represents the Secp256k1 ecdsa public key
 *
 * Secp256k1 authentication key is represented in the SDK as `AnyPublicKey`.
 */
declare class Secp256k1PublicKey extends PublicKey {
    static readonly LENGTH: number;
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
     *
     * @param args.message message
     * @param args.signature The signature
     * @returns true if the signature is valid
     */
    verifySignature(args: {
        message: HexInput;
        signature: Secp256k1Signature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Secp256k1PublicKey;
    static load(deserializer: Deserializer): Secp256k1PublicKey;
    static isPublicKey(publicKey: PublicKey): publicKey is Secp256k1PublicKey;
}
/**
 * A Secp256k1 ecdsa private key
 */
declare class Secp256k1PrivateKey extends PrivateKey {
    /**
     * Length of Secp256k1 ecdsa private key
     */
    static readonly LENGTH: number;
    /**
     * The private key bytes
     * @private
     */
    private readonly key;
    /**
     * Create a new PrivateKey instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
    /**
     * Get the private key in bytes (Uint8Array).
     *
     * @returns
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
    sign(message: HexInput): Secp256k1Signature;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Secp256k1PrivateKey;
    /**
     * Generate a new random private key.
     *
     * @returns Secp256k1PrivateKey
     */
    static generate(): Secp256k1PrivateKey;
    /**
     * Derive the Secp256k1PublicKey from this private key.
     *
     * @returns Secp256k1PublicKey
     */
    publicKey(): Secp256k1PublicKey;
    /**
     * Derives a private key from a mnemonic seed phrase.
     *
     * @param path the BIP44 path
     * @param mnemonics the mnemonic seed phrase
     *
     * @returns The generated key
     */
    static fromDerivationPath(path: string, mnemonics: string): Secp256k1PrivateKey;
    /**
     * A private inner function so we can separate from the main fromDerivationPath() method
     * to add tests to verify we create the keys correctly.
     *
     * @param path the BIP44 path
     * @param seed the seed phrase created by the mnemonics
     *
     * @returns The generated key
     */
    private static fromDerivationPathInner;
    static isPrivateKey(privateKey: PrivateKey): privateKey is Secp256k1PrivateKey;
}
/**
 * A signature of a message signed using an Secp256k1 ecdsa private key
 */
declare class Secp256k1Signature extends Signature {
    /**
     * Secp256k1 ecdsa signatures are 256-bit.
     */
    static readonly LENGTH = 64;
    /**
     * The signature bytes
     * @private
     */
    private readonly data;
    /**
     * Create a new Signature instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
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
    static deserialize(deserializer: Deserializer): Secp256k1Signature;
    static load(deserializer: Deserializer): Secp256k1Signature;
    static isSignature(signature: Signature): signature is Secp256k1Signature;
}

export { Secp256k1PrivateKey, Secp256k1PublicKey, Secp256k1Signature };
