import { Fetchable } from "./hooks/use-fetchable";

export type AttributesConfig = {
    [Attribute: string]: {
        [value: string]: string;
    }
}

export type AttributesMap = {
    [key: string]: string;
}

export type CollectionDetails = {
    collectionMint: string,
    collectionMetadataAccount: string,
    collectionMasterEditionAccount: string,
    collectionMetadataUri: string,
}

export type AssetMetadata = {
    name: string,
    symbol: string,
    description: string,
    external_url: string,
    image?: string,
    attributes?: {
        trait_type: string,
        value: string,
    }[],
    properties: {
        files: {
            uri: string,
            type: "image/png" | "application/json",
        }[],
        category: "image",
    }
};

export type TreeConfig = {
    publicKey: string,
    createTreeTransaction: string,
    maxDepth: number,
    maxBufferSize: number,
    canopy: number,
}

export type MintConfig = {
    // Tree config
    tree: TreeConfig,

    // Attribute combinations
    attributes: AttributesConfig;
    
    // Collection public keys
    collection: CollectionDetails;

    // Metadata to use when generating NFTs
    metadata: AssetMetadata,

    // Storage account
    storage: {
        shadowAccount: string,
    },
}

export type GenerateMediaResponse = {
    primary: Buffer | string | null;
    pfp: Buffer | string | null;
}

export type MintInput = {
    attributes: AttributesMap,
    metadataUri: string,
}

export type StageMintInput = {
    attributes: AttributesMap,
}

export type StageMintResponse = {
    metadataUri: string;
}

export type MintResponse = {
    tiplinkUrl?: string;
    transaction?: string;
    assetId?: string;
    attributes?: AttributesMap;
    error?: string;
    metadataUri?: string;
}

export type MediaResponse = {
    primary?: string;
    pfp?: string;
}

export type CharacterDesignContext = {
    config: MintConfig,
    
    attributeValuesMap: AttributesMap;
    mintState: Fetchable<MintResponse>;
    mediaState: Fetchable<MediaResponse>;
    stagedMintState: Fetchable<StageMintResponse>;
    isMinting: boolean;

    
    showConfirmMint: boolean;
    setShowConfirmMint: React.Dispatch<React.SetStateAction<boolean>>;

    setAttributeValue: (attributeName: string, value: string,) => void;
    // setSelectedAttribute: (key: string) => void;
    mint: () => void;
    generatePreview: () => void;
    randomize: () => void;
}
