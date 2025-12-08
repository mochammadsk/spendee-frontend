import type { ComponentPublicInstance } from 'vue';

declare module 'vue' {
  export type GenericComponentInstance = ComponentPublicInstance;
}
