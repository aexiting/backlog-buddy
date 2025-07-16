import { ItemStatus, ItemType } from "../graphql";
import { Badge, Card, Flex, Heading, Image, Rating, useTheme, View } from "@aws-amplify/ui-react";

export type BacklogItemProps = {
    status: ItemStatus;
    type: ItemType;
    title: string;
    image: string;
    rating: number;
    createdAt: string;
}

const MAX_RATING = 5;


type DatePillProps = {
    date: string; // or Date
};

export const DatePill = ({ date }: DatePillProps) => {
    const { tokens } = useTheme();

    // format however you like; here we go MM/DD/YYYY
    const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <Badge
            size="small"
            borderRadius={tokens.radii.full}
            paddingInline={tokens.space.small}
            fontWeight={tokens.fontWeights.medium}
            paddingBlock="6px"
        >
            {formatted}
        </Badge>
    );
};


export const BacklogItem = ({
                                status,
                                title,
                                rating,
                                type,
                                createdAt
                            }: BacklogItemProps) => {
    const { tokens } = useTheme();

    return (
        <Card
            variation="elevated"
            backgroundColor={tokens.colors.background.primary}

            padding={tokens.space.medium}
            as="button"
        >
            <Flex direction="column" alignItems="flex-start">
                <View width="100%" height="0" paddingBottom="140%">
                    <Image alt={title}
                           src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154768-DHHvNd4MjV1p.jpg"}
                           objectFit="cover"/>
                </View>

                <Flex direction="row" alignItems="flex-start" marginBlockEnd="0">
                    <Heading level={5}>
                        {title}
                    </Heading>
                </Flex>
                <Flex>
                    <Badge size="small" variation="info">
                        {type}
                    </Badge>
                    <Badge
                        size="small"
                        variation={
                            status === 'COMPLETED'
                                ? 'success'
                                : status === 'DROPPED'
                                    ? 'error'
                                    : 'info'
                        }
                    >
                        {status.replace('_', ' ')}
                    </Badge>
                    <DatePill date={createdAt} />

                </Flex>
                <Flex>
                    <Rating
                        value={rating}
                        maxValue={MAX_RATING}
                        fillColor={tokens.colors.teal["80"]}
                        emptyColor={tokens.colors.neutral["40"]}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}