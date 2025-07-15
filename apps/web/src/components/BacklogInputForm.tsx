import { ItemStatus, ItemType } from "../API";
import type { BacklogInputActions, BacklogInputState } from "./use-backlog-input.ts";
import {
    Alert,
    Button,
    Card,
    Flex,
    Heading,
    SelectField,
    SliderField,
    Text,
    TextField,
    View
} from "@aws-amplify/ui-react";

type BacklogInputFormProps = {
    state: BacklogInputState,
    actions: BacklogInputActions,
};


export const BacklogInputForm = ({ state, actions }: BacklogInputFormProps) => {


    const { input, isLoading, isError, isEditMode } = state;
    const { setInput, submitBacklogItem, submitBacklogEdit, submitBacklogDelete } = actions;

    const onChange =
        <K extends keyof typeof input>(key: K) =>
            (value: string | number) =>
                setInput({ ...input, [key]: value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            submitBacklogEdit();
        } else {
            submitBacklogItem();
        }
    };

    return (
        <Card>
            <View as="form" onSubmit={handleSubmit}>
                <Flex direction="row" gap="1rem" justifyContent="space-between">

                    <Heading level={4} >
                        {isEditMode ? "Edit Backlog item" : "Add to Backlog"}
                    </Heading>
                    {isEditMode && <Button
                        variation="warning"
                        loadingText="Deleting..."
                        onClick={()=> submitBacklogDelete()}
                    >
                        Delete
                    </Button>}
                </Flex>
                <Flex direction="column" gap="1rem">
                    <TextField
                        label="Title"
                        placeholder="Cowboy Bebop"
                        value={input.title}
                        onChange={(e) => onChange('title')(e.target.value)}
                        isRequired
                        isDisabled={isEditMode}
                    />
                    <SelectField
                        label="Type"
                        value={input.type}
                        onChange={(e) => onChange('type')(e.target.value as ItemType)}
                    >
                        <option value={ItemType.ANIME}>Anime</option>
                        <option value={ItemType.MANGA}>Manga</option>
                    </SelectField>
                    {isEditMode && <SelectField
                        label="Status"
                        value={input.status}
                        onChange={(e) => onChange('status')(e.target.value as ItemStatus)}
                    >
                        <option value={ItemStatus.COMPLETED}>Completed</option>
                        <option value={ItemStatus.DROPPED}>Dropped</option>
                        <option value={ItemStatus.PENDING}>Watching</option>
                        <option value={ItemStatus.NOT_STARTED}>Not Started</option>

                    </SelectField>}

                    {/* Rating 1-10 (optional) */}
                    <SliderField
                        label={
                            <Text as="span">
                                Rating <Text color="font.secondary">(optional)</Text>
                            </Text>
                        }
                        min={1}
                        max={5}
                        step={1}
                        value={input.rating}
                        onChange={(value) => onChange('rating')(value)}
                        isValueHidden={false}
                    />

                    {isError && (
                        <Alert variation="error" isDismissible={true}>
                            Something went wrong—please try again.
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variation="primary"
                        isLoading={isLoading}
                        loadingText="Adding…"
                    >
                        {isEditMode ? 'Update backlog' : 'Add to backlog'}
                    </Button>
                </Flex>
            </View>
        </
            Card>

    );
};