import { Client, ClientConfig, AptosSettings } from '../types/index.mjs';
import { Network } from '../utils/apiEndpoints.mjs';
import { AptosApiType } from '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * This class holds the config information for the SDK client instance.
 */
declare class AptosConfig {
    /** The Network that this SDK is associated with. Defaults to DEVNET */
    readonly network: Network;
    /**
     * The client instance the SDK uses. Defaults to `@aptos-labs/aptos-client
     */
    readonly client: Client;
    /**
     * The optional hardcoded fullnode URL to send requests to instead of using the network
     */
    readonly fullnode?: string;
    /**
     * The optional hardcoded faucet URL to send requests to instead of using the network
     */
    readonly faucet?: string;
    /**
     * The optional hardcoded indexer URL to send requests to instead of using the network
     */
    readonly indexer?: string;
    readonly clientConfig?: ClientConfig;
    constructor(settings?: AptosSettings);
    /**
     * Returns the URL endpoint to send the request to.
     * If a custom URL was provided in the config, that URL is returned.
     * If a custom URL was provided but not URL endpoints, an error is thrown.
     * Otherwise, the URL endpoint is derived from the network.
     *
     * @param apiType - The type of Aptos API to get the URL for.
     *
     * @internal
     */
    getRequestUrl(apiType: AptosApiType): string;
    /**
     * Checks if the URL is a known indexer endpoint
     *
     * @internal
     * */
    isIndexerRequest(url: string): boolean;
}

export { AptosConfig };
