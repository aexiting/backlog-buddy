import { BacklogItem } from "./BacklogItem.tsx";
import type { BacklogListActions, BacklogListState } from "./use-backlog-list.ts";
import { motion } from 'framer-motion';
import { Button, Flex, Loader } from "@aws-amplify/ui-react";


type BacklogListProps = {
    state: BacklogListState,
    actions: BacklogListActions
}

export const BacklogList = ({ state, actions }: BacklogListProps) => {
    const { items, hasMore, isLoading, isError } = state;
    const { loadMoreBacklog, setActiveItem } = actions;
    if (!items || items.length == 0) {
        return (
            <div>
                {isError && <h1> There was an error when loading the backlog... please refresh.</h1>}
                <p>No backlog items to display.</p>
            </div>
        )
    }

    return (
        <Flex direction="column">
            {hasMore && (
                <Flex justifyContent="center">
                    <Button
                        variation="primary"
                        onClick={() => loadMoreBacklog()}
                        isLoading={isLoading}
                    >
                        {isLoading ? <Loader size="small" /> : 'Load more'}
                    </Button>
                </Flex>
            )}

            <Flex wrap="wrap" justifyContent="center" gap="xlarge">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveItem(item)}
                    >
                        <BacklogItem {...item} />
                    </motion.div>
                ))}
            </Flex>
        </Flex>
    )
}