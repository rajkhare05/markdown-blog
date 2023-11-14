import rangeParser from 'parse-numeric-range'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('c++', cpp)

const MarkdownCustomComponents = {
    code({ node, inline, className, ...props }) {
        const hasLang = /language-(\w+)/.exec(className || '')
        const hasMeta = node?.data?.meta

        const applyHighlights = (applyHighlights) => {
            if (hasMeta) {
                const RE = /{([\d,-]+)}/
                const metadata = node.data.meta?.replace(/\s/g, '');
                const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)[1] : '0';
                const highlightLines = rangeParser(strlineNumbers);
                const highlight = highlightLines;
                const data = highlight.includes(applyHighlights) ? 'highlight' : null;
                return { data };

            } else {
                return {}
            }
        }

        return hasLang ? (
            <SyntaxHighlighter
                style={oneDark}
                language={hasLang[1]}
                PreTag="div"
                className="codeStyle"
                showLineNumbers={true}
                wrapLines={hasMeta}
                useInlineStyles={true}
                lineProps={applyHighlights}
            >
                {props.children}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props} />
        )
    },
}


export default MarkdownCustomComponents

