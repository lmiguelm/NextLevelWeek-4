import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';

import Cookies from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

import {Loading} from '../../../components/Loading';

import authentication from '../../../../public/lotties/authentication.json';

interface ScoreData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
}

interface UserData {
  githubId: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface ResponseApi {
  user: UserData;
  score: ScoreData;
}

interface AuthGiuhubProps {
  user: UserData;
  token: string;
  score: ScoreData
}

export default function AuthGithub(props: AuthGiuhubProps) {

  useEffect(() => {
    new Promise((resolve) => {
      Cookies.set('user', JSON.stringify(props.user));
      Cookies.set('token', props.token.toString());
      Cookies.set('score', JSON.stringify(props.score));
      resolve(true);
    }).then(() => {
      Router.push('/');
    });
  }, []);

  return (
    <Loading animationData={authentication}>
      <p>Autenticando usuário...</p>
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { token } = ctx.req.cookies;

  if(token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }      
    }
  }

  const { access_token } = ctx.query;

  const { data } = await axios.post<ResponseApi>(`${process.env.MOVEIT_BASE_URL}/api/${access_token}`);

  return {
    props: {
      user: data.user,
      score: data.score,
      token: access_token.toString(),
    }
  }
}