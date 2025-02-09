// components/BlogContent.tsx
import DOMPurify from 'isomorphic-dompurify';

interface BlogContentProps {
    content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
        ADD_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'a', 'img',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'iframe', 'div', 'span'
        ],
        ADD_ATTR: [
            'href', 'target', 'rel', 'src', 'alt', 'class', 'style',
            'allow', 'allowfullscreen', 'frameborder', 'scrolling'
        ],
    });

    return (
        <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default BlogContent;