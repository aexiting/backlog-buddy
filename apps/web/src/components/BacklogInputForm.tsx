import type { FormEvent } from "react";
import { ItemType } from "../API";
import type { BacklogInputActions, BacklogInputState } from "./use-backlog-input.ts";
import { Alert, Button, Flex, Heading, SelectField, SliderField, TextField, View, Text, Card } from "@aws-amplify/ui-react";
import type { AuthUser } from "aws-amplify/auth";   // adjust paths as needed

type BacklogInputFormProps = {
    state: BacklogInputState,
    actions: BacklogInputActions,
    user?: AuthUser
};


/**
 * Renders a small form (title, type, rating) and calls submitBacklogItem
 * from the custom hook.  Styling is Tailwind-friendly but framework-agnostic.
 */
export const BacklogInputForm = ({ state, actions, user }: BacklogInputFormProps) => {


    const { input, isLoading, isError } = state;
    const { setInput, submitBacklogItem } = actions;

    const onChange =
        <K extends keyof typeof input>(key: K) =>
            (value: string | number) =>
                setInput({ ...input, [key]: value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitBacklogItem();
    };

    return (
        <Card>

        <View as="form" onSubmit={handleSubmit}>
            <Heading level={4} marginBottom="1rem">
                Add to Backlog
            </Heading>

            <Flex direction="column" gap="1rem">
                {/* Title */}
                <TextField
                    label="Title"
                    placeholder="Cowboy Bebop"
                    value={input.title}
                    onChange={(e) => onChange('title')(e.target.value)}
                    isRequired
                />

                {/* Type */}
                <SelectField
                    label="Type"
                    value={input.type}
                    onChange={(e) => onChange('type')(e.target.value as ItemType)}
                >
                    <option value={ItemType.ANIME}>Anime</option>
                    <option value={ItemType.MANGA}>Manga</option>
                </SelectField>

                {/* Rating 1-10 (optional) */}
                <SliderField
                    label={
                        <Text as="span">
                            Rating <Text color="font.secondary">(optional)</Text>
                        </Text>
                    }
                    min={1}
                    max={10}
                    step={1}
                    value={input.rating}
                    onChange={(value) => onChange('rating')(value)}
                    isValueHidden={false}
                />

                {/* Error banner */}
                {isError && (
                    <Alert variation="error" isDismissible={true}>
                        Something went wrong—please try again.
                    </Alert>
                )}

                {/* Submit */}
                <Button
                    type="submit"
                    variation="primary"
                    isLoading={isLoading}
                    loadingText="Adding…"
                >
                    Add to backlog
                </Button>
            </Flex>
        </View>
        </
        Card>

    );
};