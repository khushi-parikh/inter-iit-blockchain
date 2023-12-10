import { AccountAddress } from './accountAddress.mjs';
import { AuthenticationKey } from './authenticationKey.mjs';
import { PublicKey, PrivateKey, Signature } from './crypto/asymmetricCrypto.mjs';
import { SigningScheme, GenerateAccount, SigningSchemeInput, HexInput } from '../types/index.mjs';
import '../bcs/serializer.mjs';
import './hex.mjs';
import './common.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';

/**
 * Class for creating and managing account on Aptos network
 *
 * Use this class to create accounts, sign transactions, and more.
 * Note: Creating an account instance does not create the account on-chain.
 *
 * Since [AIP-55](https://github.com/aptos-foundation/AIPs/pull/263) Aptos supports
 * `Legacy` and `Unified` authentications.
 *
 * @Legacy includes `ED25519` and `MultiED25519`
 * @Unified includes `SingleSender` and `MultiSender`, where currently
 * `SingleSender` supports `ED25519` and `Secp256k1`, and `MultiSender` supports
 * `MultiED25519`.
 *
 * In TypeScript SDK, we support all of these options:
 *
 * @generate default to generate Legacy Ed25519 keys, with an optional `legacy` boolean argument
 * that lets you generate new keys conforming to the Unified authentication.
 *
 * @fromPrivateKey derives an account by a provided private key and address, with an optional
 * `legacy` boolean argument that lets you generate new keys conforming to the Unified authentication.
 *
 * @fromDerivationPath derives an account with bip44 path and mnemonics,
 *
 */
declare class Account {
    /**
     * Public key associated with the account
     */
    readonly publicKey: PublicKey;
    /**
     * Private key associated with the account
     */
    readonly privateKey: PrivateKey;
    /**
     * Account address associated with the account
     */
    readonly accountAddress: AccountAddress;
    /**
     * Signing scheme used to sign transactions
     */
    readonly signingScheme: SigningScheme;
    /**
     * constructor for Account
     *
     * Need to update this to use the new crypto library if new schemes are added.
     *
     * @param args.privateKey PrivateKey - private key of the account
     * @param args.address AccountAddress - address of the account
     * @param args.legacy optional. If set to true, the keypair authentication keys will be derived with a Legacy scheme.
     * Defaults to deriving an authentication key with a Unified scheme
     *
     * This method is private because it should only be called by the factory static methods.
     * @returns Account
     */
    private constructor();
    /**
     * Derives an account with random private key and address.
     *
     * Default generation is using the Legacy ED25519 key
     *
     * @param args optional. Unify GenerateAccount type for Legacy and Unified keys
     *
     * Account input type to generate an account using Legacy
     * Ed25519 or MultiEd25519 keys or without a specified `scheme`.
     * ```
     * GenerateAccountWithLegacyKey = {
     *  scheme?: SigningSchemeInput.Ed25519 | SigningSchemeInput.MultiEd25519;
     *  legacy: true;
     * };
     * ```
     *
     * Account input type to generate an account using Unified
     * Secp256k1Ecdsa key
     * In this case `legacy` is always false
     * ```
     * GenerateAccountWithUnifiedKey = {
     *  scheme: SigningSchemeInput.Secp256k1Ecdsa;
     *  legacy?: false;
     * };
     * ```
     *
     * @returns Account with the given signing scheme
     */
    static generate(args?: GenerateAccount): Account;
    /**
     * Instantiates an account given a private key.
     *
     * This is used as a local calculation and therefore is used to instantiate an `Account`
     * that has not had its authentication key rotated.
     *
     * @param privateKey PrivateKey - private key of the account
     * @param args.legacy optional. If set to false, the keypair generated is a Unified keypair. Defaults
     * to generating a Legacy Ed25519 keypair
     *
     * @returns Account
     */
    static fromPrivateKey(args: {
        privateKey: PrivateKey;
        legacy?: boolean;
    }): Account;
    /**
     * Instantiates an account given a private key and a specified account address.
     * This is primarily used to instantiate an `Account` that has had its authentication key rotated.
     *
     * @param args.privateKey PrivateKey - the underlying private key for the account
     * @param args.address AccountAddress - The account address the `Account` will sign for
     * @param args.legacy optional. If set to false, the keypair generated is a Unified keypair. Defaults
     * to generating a Legacy Ed25519 keypair
     *
     * @returns Account
     */
    static fromPrivateKeyAndAddress(args: {
        privateKey: PrivateKey;
        address: AccountAddress;
        legacy?: boolean;
    }): Account;
    /**
     * Derives an account with bip44 path and mnemonics,
     *
     * @param args.scheme The signing scheme to derive with
     * @param args.path the BIP44 derive hardened path (e.g. m/44'/637'/0'/0'/0') for Ed25519,
     * or non-hardened path (e.g. m/44'/637'/0'/0/0) for secp256k1
     * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
     * @param args.mnemonic the mnemonic seed phrase of the account
     * @param args.legacy optional. If set to false, the keypair generated is a Unified keypair. Defaults
     * to generating a Legacy Ed25519 keypair
     *
     * @returns Account
     */
    static fromDerivationPath(args: {
        scheme: SigningSchemeInput;
        path: string;
        mnemonic: string;
        legacy?: boolean;
    }): Account;
    /**
     * This key enables account owners to rotate their private key(s)
     * associated with the account without changing the address that hosts their account.
     * See here for more info: {@link https://aptos.dev/concepts/accounts#single-signer-authentication}
     *
     * @param args.publicKey PublicKey - public key of the account
     * @returns The authentication key for the associated account
     */
    static authKey(args: {
        publicKey: PublicKey;
    }): AuthenticationKey;
    /**
     * Sign the given message with the private key.
     *
     * TODO: Add sign transaction or specific types
     *
     * @param data in HexInput format
     * @returns Signature
     */
    sign(data: HexInput): Signature;
    /**
     * Verify the given message and signature with the public key.
     *
     * @param args.message raw message data in HexInput format
     * @param args.signature signed message Signature
     * @returns
     */
    verifySignature(args: {
        message: HexInput;
        signature: Signature;
    }): boolean;
}

export { Account };
