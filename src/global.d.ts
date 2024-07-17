// declare module "passport";
// declare module "bcrypt";
// declare module "gravatar";
// declare module "jsonwebtoken";
// import type Echo from 'laravel-echo';
// import $api from '@/protocal/RESTfulApi/methods';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $mitt: Emitter;
//     $api: typeof $api
//   }
// }
// declare global {
//   interface Window {
//     Echo?: Echo;
//     TradingView?:TradingView, 
//   }
// }

interface UserInfo {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  identity: string;
  date: Date;
}