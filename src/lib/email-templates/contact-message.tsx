import React from 'react'
import { Html, Head, Body, Container, Heading, Text, Preview, Hr } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props { name?: string; email?: string; message?: string }
const ContactMessage = ({ name = 'Visitante', email = '', message = '' }: Props) => (
  <Html lang="pt-BR"><Head /><Preview>Nova mensagem de contato para Marlon Bastida</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#292824' }}>
      <Container style={{ padding: '32px 24px', maxWidth: '600px' }}>
        <Text style={{ color: '#463629', fontWeight: 700 }}>Marlon Bastida</Text>
        <Heading>Nova mensagem de contato</Heading>
        <Text>Nome: {name}</Text><Text>E-mail: {email}</Text><Hr />
        <Text style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{message}</Text>
      </Container>
    </Body>
  </Html>
)
export const template = {
  component: ContactMessage,
  subject: 'Nova mensagem pelo site — Marlon Bastida',
  displayName: 'Contato do portfólio',
  to: 'contactme@marlonbastida.com.br',
  previewData: { name: 'Visitante', email: 'visitante@example.com', message: 'Gostaria de conversar sobre um projeto DevOps.' },
} satisfies TemplateEntry