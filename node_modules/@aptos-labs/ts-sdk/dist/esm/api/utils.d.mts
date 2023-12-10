import { ProcessorType } from '../utils/const.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { AnyNumber } from '../types/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * Utility function to handle optional waiting on indexer for APIs
 *
 * This is purposely placed here to not expose this internal function.
 * @param args
 */
declare function waitForIndexerOnVersion(args: {
    config: AptosConfig;
    minimumLedgerVersion?: AnyNumber;
    processorTypes: Array<ProcessorType>;
}): Promise<void>;

export { waitForIndexerOnVersion };
