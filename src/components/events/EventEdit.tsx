import { Edit, SimpleForm, TextInput, DateTimeInput, required, useRecordContext, TopToolbar, ShowButton, useInput } from 'react-admin';
import { Box } from '@mui/material';
import { ImageInput } from './ImageInput';

const EventTitle = () => {
    const record = useRecordContext();
    return <span>Modifier {record?.event_name || "l'événement"}</span>;
};

const EventActions = () => (
    <TopToolbar>
        <ShowButton />
    </TopToolbar>
);

export const EventEdit = () => {
    const { field } = useInput({ source: 'event_image' });

    return (
        <Edit 
            title={<EventTitle />}
            actions={<EventActions />}
            mutationMode="pessimistic"
        >
            <Box sx={{ p: 2 }}>
                <SimpleForm
                    sx={{
                        '& .RaSimpleForm-form': {
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 3
                        }
                    }}
                >
                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput
                            source="event_name"
                            label="Nom de l'événement"
                            validate={[required()]}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <DateTimeInput
                        source="event_date"
                        label="Date et heure"
                        validate={[required()]}
                    />

                    <TextInput
                        source="event_place"
                        label="Lieu"
                        validate={[required()]}
                    />

                    <TextInput
                        source="event_category"
                        label="Catégorie"
                        validate={[required()]}
                    />

                    <TextInput
                        source="event_organizer"
                        label="Organisateur"
                        validate={[required()]}
                    />

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput
                            source="event_description"
                            label="Description"
                            validate={[required()]}
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput
                            source="additional_info"
                            label="Informations supplémentaires"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <ImageInput value={field.value} onChange={field.onChange} />
                    </Box>
                </SimpleForm>
            </Box>
        </Edit>
    );
};
