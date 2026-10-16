import { backupArticleEn, backupArticlePt } from './articles-backup'
import { k3dArticleEn, k3dArticlePt } from './articles-k3d'
// Original article copy supplied by Marlon Bastida, without advertising.
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'link'; text: string; url: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; code: string }
  | { type: 'image'; url: string; alt: string; caption: string }

export type Article = {
  slug: string
  title: string
  summary: string
  blocks: ArticleBlock[]
}

export const articles: Article[] = [
  {
    "slug": "mobile-device-corporate-security",
    "title": "What precautions should we take when using a mobile device in the corporate world ?",
    "summary": "In principle, when we are in a company, we follow all the security approaches and guidelines imposed by the organization, which is more than expected. Examples include: standards for industry payments regulated within the corporation, such as PCI-DSS, or pre-established security policies in the case of large multinationals, such as ISO 27001.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "In principle, when we are in a company, we follow all the security approaches and guidelines imposed by the organization, which is more than expected. Examples include: standards for industry payments regulated within the corporation, such as PCI-DSS, or pre-established security policies in the case of large multinationals, such as ISO 27001."
      },
      {
        "type": "paragraph",
        "text": "These approaches range from clean desk policies, screen protections with passwords, biometrics on laptops, disabling the use of USB ports, anti-theft locks to secure devices to your desk, encryption of data stored in operating systems like Linux with LUKS or Windows with BitLocker, restrictions on penetration testing for security vulnerabilities using SELinux in open systems, the use of access cards and notifications of your activity when passing through internal security upon entering the company or restricted environments (e.g., reception, data centers, and sensitive departments like HR or Finance, which are restricted by function), restrictions on website usage or software installation (via proxies and web filters through firewalls), which prevent data leaks or espionage by security agencies, and, most importantly, confidentiality agreements regarding client information when we are hired."
      },
      {
        "type": "paragraph",
        "text": "This information can be disseminated within a company through instructions to employees via communication channels such as leadership, or through security policies contained in documentation or the intranet."
      },
      {
        "type": "paragraph",
        "text": "However, in the current world we live in, we are almost daily connected through a corporate or personal smartphone (BYOD — Bring Your Own Device). Many of these measures are neglected depending on the company’s culture and size."
      },
      {
        "type": "paragraph",
        "text": "Often, we overlook simple issues, and due to time and productivity concerns, we have corporate email, client documentation, phone numbers, or data stored in the cloud installed on our devices, which could potentially be leaked, for example."
      },
      {
        "type": "paragraph",
        "text": "For this reason, it becomes increasingly necessary to adopt protective measures with simple tools that, in the event of theft or misuse of your device, provide restrictive layers to prevent the improper circulation of data."
      },
      {
        "type": "paragraph",
        "text": "That’s why I think it’s worth considering the security of your smartphone or laptop with tools that align with the company’s internal policy and can be incorporated."
      },
      {
        "type": "paragraph",
        "text": "On the Electronic Frontier Foundation (EFF) website below, there are several tools and approaches that I found interesting:"
      },
      {
        "type": "list",
        "items": [
          "Two-factor authentication (2FA) — Apps like Authy, Google Authenticator, and Microsoft Authenticator.",
          "Signal app, a messenger similar to tools like Telegram and WhatsApp.",
          "Data removal protection measures.",
          "Password vaults: Apps for storing passwords with 2FA, such as KeePassXC (which supports cryptographic keys and a challenge when the password database is modified — it’s not natively 2FA), or LastPass with 2FA, which isn’t the EFF’s focus as it’s proprietary but offers free use with limitations.",
          "Another free tool is a clone of TrueCrypt (used by Eike Batista to encrypt hard drive data) called VeraCrypt, an application that stores your data in a file that, when mounted, becomes a disk drive. In other words, if you want to store 100GB, you’ll have a file of that size, and when mounted, it becomes a drive with that capacity. This app, when used on a laptop, enables the creation of data containers that can only be opened with a master password — one that must never be forgotten! For those who prefer something native to Windows, the same can be done with BitLocker Virtual Hard Drive (VHD)."
        ]
      },
      {
        "type": "paragraph",
        "text": "It’s also worth noting that there are U2F/FIDO keys (Universal 2nd Factor) that serve as a security measure against data leaks (e.g., Yubikey). These currently come in both USB and NFC versions for mobile devices."
      },
      {
        "type": "paragraph",
        "text": "Note that among these tools, there are ways to enhance security actions via VPNs, for example, as well as additional layers of protection like the TOR software — which has been targeted by police operations but can easily be restricted through the operating system, network, and, most importantly, compliance (validation) with the company’s internal policies."
      },
      {
        "type": "paragraph",
        "text": "As the EFF is an organization from the early days of the internet, it fights for digital privacy, free expression, and innovation, with a focus on ensuring self-protection against surveillance (they advocate for an internet free from corporate control). However, this doesn’t invalidate the tools discussed in the link below for beneficial use, because just as a tool can be misused, we can also protect corporate data with these same tools. When well-utilized and agreed upon in internal policies, they become extremely useful."
      },
      {
        "type": "link",
        "text": "Useful tools",
        "url": "https://ssd.eff.org/pt-br/module-categories/guias-de-ferramentas"
      },
      {
        "type": "link",
        "text": "List of sites and whether they support 2FA",
        "url": "https://twofactorauth.org/#social"
      }
    ]
  }
]

articles.push(backupArticleEn)
articles.push(k3dArticleEn)

const portugueseArticle: Article = {
  slug: 'mobile-device-corporate-security',
  title: 'Quais cuidados devemos tomar ao usar um dispositivo móvel no mundo corporativo?',
  summary: 'Em princípio, quando estamos em uma empresa, seguimos todas as abordagens e diretrizes de segurança impostas pela organização, o que é mais do que esperado. Entre os exemplos estão normas para pagamentos do setor regulamentadas dentro da corporação, como PCI-DSS, ou políticas de segurança preestabelecidas no caso de grandes multinacionais, como ISO 27001.',
  blocks: [
    {
      type: 'paragraph',
      text: 'Em princípio, quando estamos em uma empresa, seguimos todas as abordagens e diretrizes de segurança impostas pela organização, o que é mais do que esperado. Entre os exemplos estão normas para pagamentos do setor regulamentadas dentro da corporação, como PCI-DSS, ou políticas de segurança preestabelecidas no caso de grandes multinacionais, como ISO 27001.',
    },
    {
      type: 'paragraph',
      text: 'Essas abordagens vão desde políticas de mesa limpa, proteção de tela com senhas, biometria em notebooks, desativação do uso de portas USB, travas antifurto para prender os dispositivos à mesa, criptografia dos dados armazenados em sistemas operacionais como Linux com LUKS ou Windows com BitLocker, restrições a testes de intrusão para identificar vulnerabilidades de segurança usando SELinux em sistemas abertos, uso de cartões de acesso e notificações de sua atividade ao passar pela segurança interna ao entrar na empresa ou em ambientes restritos (por exemplo, recepção, data centers e departamentos sensíveis como RH ou Financeiro, cujo acesso é restrito por função), restrições ao uso de sites ou à instalação de software (por meio de proxies e filtros web em firewalls), que impedem vazamentos de dados ou espionagem por agências de segurança, e, principalmente, acordos de confidencialidade sobre informações de clientes quando somos contratados.',
    },
    {
      type: 'paragraph',
      text: 'Essas informações podem ser disseminadas dentro de uma empresa por meio de orientações aos funcionários em canais de comunicação, como a liderança, ou por políticas de segurança presentes na documentação ou na intranet.',
    },
    {
      type: 'paragraph',
      text: 'No entanto, no mundo atual em que vivemos, estamos quase diariamente conectados por meio de um smartphone corporativo ou pessoal (BYOD — Bring Your Own Device, ou traga seu próprio dispositivo). Muitas dessas medidas são negligenciadas dependendo da cultura e do tamanho da empresa.',
    },
    {
      type: 'paragraph',
      text: 'Muitas vezes, deixamos de observar questões simples e, por motivos de tempo e produtividade, temos e-mail corporativo, documentação de clientes, números de telefone ou dados armazenados na nuvem instalados em nossos dispositivos, que podem acabar vazando, por exemplo.',
    },
    {
      type: 'paragraph',
      text: 'Por esse motivo, torna-se cada vez mais necessário adotar medidas de proteção com ferramentas simples que, em caso de roubo ou uso indevido do dispositivo, ofereçam camadas restritivas para impedir a circulação indevida de dados.',
    },
    {
      type: 'paragraph',
      text: 'Por isso, acho que vale a pena considerar a segurança do seu smartphone ou notebook com ferramentas que estejam alinhadas à política interna da empresa e que possam ser incorporadas.',
    },
    {
      type: 'paragraph',
      text: 'No site da Electronic Frontier Foundation (EFF) abaixo, há diversas ferramentas e abordagens que achei interessantes:',
    },
    {
      type: 'list',
      items: [
        'Autenticação de dois fatores (2FA) — Aplicativos como Authy, Google Authenticator e Microsoft Authenticator.',
        'Aplicativo Signal, um mensageiro semelhante a ferramentas como Telegram e WhatsApp.',
        'Medidas de proteção por meio da remoção de dados.',
        'Cofres de senhas: aplicativos para armazenar senhas com 2FA, como KeePassXC (que oferece suporte a chaves criptográficas e a um desafio quando o banco de dados de senhas é modificado — não possui 2FA nativamente), ou LastPass com 2FA, que não é o foco da EFF por ser proprietário, mas oferece uso gratuito com limitações.',
        'Outra ferramenta gratuita é um clone do TrueCrypt (usado por Eike Batista para criptografar dados de discos rígidos) chamado VeraCrypt, um aplicativo que armazena seus dados em um arquivo que, quando montado, torna-se uma unidade de disco. Em outras palavras, se você quiser armazenar 100 GB, terá um arquivo desse tamanho e, quando montado, ele se tornará uma unidade com essa capacidade. Esse aplicativo, quando usado em um notebook, permite criar contêineres de dados que só podem ser abertos com uma senha mestra — uma senha que nunca deve ser esquecida! Para quem prefere algo nativo do Windows, o mesmo pode ser feito com o Disco Rígido Virtual (VHD) do BitLocker.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Também vale destacar que existem chaves U2F/FIDO (Universal 2nd Factor) que servem como medida de segurança contra vazamentos de dados (por exemplo, Yubikey). Atualmente, elas estão disponíveis em versões USB e NFC para dispositivos móveis.',
    },
    {
      type: 'paragraph',
      text: 'Observe que, entre essas ferramentas, há maneiras de reforçar ações de segurança por meio de VPNs, por exemplo, além de camadas adicionais de proteção como o software TOR — que já foi alvo de operações policiais, mas pode ser facilmente restringido por meio do sistema operacional, da rede e, principalmente, da conformidade (validação) com as políticas internas da empresa.',
    },
    {
      type: 'paragraph',
      text: 'Como a EFF é uma organização dos primórdios da internet, ela luta pela privacidade digital, pela liberdade de expressão e pela inovação, com foco em garantir a autoproteção contra a vigilância (defende uma internet livre do controle corporativo). No entanto, isso não invalida o uso benéfico das ferramentas discutidas no link abaixo, porque, assim como uma ferramenta pode ser usada de forma indevida, também podemos proteger dados corporativos com essas mesmas ferramentas. Quando bem utilizadas e acordadas nas políticas internas, elas se tornam extremamente úteis.',
    },
    {
      type: 'link',
      text: 'Ferramentas úteis',
      url: 'https://ssd.eff.org/pt-br/module-categories/guias-de-ferramentas',
    },
    {
      type: 'link',
      text: 'Lista de sites e se oferecem suporte a 2FA',
      url: 'https://twofactorauth.org/#social',
    },
  ],
}

export const articlesByLanguage: Record<'pt' | 'en', Article[]> = {
  pt: [portugueseArticle, backupArticlePt, k3dArticlePt],
  en: articles,
}
