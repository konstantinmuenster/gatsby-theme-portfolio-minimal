import React from 'react';
import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';

export default function NotFoundPage(): React.ReactElement {
    return (
        <>
            <Seo title="404: Not found" noIndex={true} />
            <Page>
                <Section heading="Not Found" anchor="404">
                    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
                </Section>
            </Page>
        </>
    );
}
