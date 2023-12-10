import { Account } from '../../core/account.mjs';
import { AccountAuthenticator } from '../../transactions/authenticator/account.mjs';
import { AnyRawTransaction } from '../../transactions/types.mjs';
import { AptosConfig } from '../aptosConfig.mjs';
import '../../core/accountAddress.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/deserializer.mjs';
import '../../transactions/instances/transactionArgument.mjs';
import '../../core/authenticationKey.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/secp256k1.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../../transactions/instances/rawTransaction.mjs';
import '../../transactions/instances/chainId.mjs';
import '../../transactions/instances/transactionPayload.mjs';
import '../../transactions/instances/identifier.mjs';
import '../../transactions/instances/moduleId.mjs';
import '../../transactions/typeTag/index.mjs';
import '../../utils/const.mjs';

/**
 * A class to handle all `Sign` transaction operations
 */
declare class Sign {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    transaction(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): AccountAuthenticator;
    transactionAsFeePayer(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): AccountAuthenticator;
}

export { Sign };
