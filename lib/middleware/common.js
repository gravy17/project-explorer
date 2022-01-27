import nc from 'next-connect';
import { middlewareOptions } from '../utils/nextConnectOptions';
import session from './session';

export default function baseHandler() {
  return nc(middlewareOptions).use(session);
}