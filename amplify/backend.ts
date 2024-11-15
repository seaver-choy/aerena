import { defineBackend } from '@aws-amplify/backend';
import { packsFunction } from './functions/packs/resource';

defineBackend({
    packsFunction
});