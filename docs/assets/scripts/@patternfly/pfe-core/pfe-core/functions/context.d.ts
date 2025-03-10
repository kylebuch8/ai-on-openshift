import { createContext, type Context } from '@lit/context';
/**
 * In order to prevent late-upgrading-context-consumers from 'missing'
 * their rightful context providers, we must set up a `ContextRoot` on the body.
 * Always use this function when creating contexts that are shared with child elements.
 * @param args createContext args
 */
export declare function createContextWithRoot<T>(...args: Parameters<typeof createContext>): Context<unknown, T>;
